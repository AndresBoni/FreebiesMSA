using backend.Interfaces;
using backend.Mapping;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class RedemptionController : ControllerBase
    {
        private readonly IRedemptionRepository _redemptionRepository;
        private readonly ICampaignRepository _campaignRepository;
        private readonly IUserService _userService;
        private readonly ILogger<RedemptionController> _logger;

        public RedemptionController(
            IRedemptionRepository redemptionRepository, 
            ICampaignRepository campaignRepository, 
            IUserService userService,
            ILogger<RedemptionController> logger)
        {
            _redemptionRepository = redemptionRepository;
            _campaignRepository = campaignRepository;
            _userService = userService;
            _logger = logger;
        }

        [HttpPost("requestCode/{campaignId:int}")]
        public async Task<IActionResult> RequestRedemption(int campaignId)
        {
            try
            {
                var user = await _userService.GetAuthenticatedUserAsync(User);

                if (user == null)
                {
                    _logger.LogWarning("User not found");
                    return Unauthorized("User not found");
                }

                var redemption = new Redemption
                {
                    UserId = user.Id,
                    CampaignId = campaignId,
                    RedemptionCode = CouponCodeService.GenerateCouponCode(),
                    CreatedAt = DateTime.UtcNow,
                    ExpirationDate = DateTime.UtcNow.AddMinutes(15),
                    Validated = false
                };

                var createdRedemption = await _redemptionRepository.CreateRedemptionAsync(redemption);

                if (createdRedemption == null)
                {
                    _logger.LogWarning("Campaing not found");
                    return BadRequest("Campaign not found");
                }

                var redemptionDto = RedemptionMapper.ToDto(createdRedemption);
                return Ok(redemptionDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while requesting redemption.");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("redeemCode/{redemptionCode}")]
        [Authorize(Policy = "CompanyOnly")]
        public async Task<IActionResult> RedeemRedemption(string redemptionCode)
        {
            try
            {
                var user = await _userService.GetAuthenticatedUserAsync(User);
                if (user == null)
                    {
                        _logger.LogWarning("User not found");
                        return Unauthorized("User not found");
                    }

                var redemption = await _redemptionRepository.GetRedemptionByCodeAsync(redemptionCode);
                if (redemption == null)
                {
                    _logger.LogWarning("Redemption code not found.");
                    return BadRequest("Redemption code not found.");
                }

                if (redemption.Validated)
                {
                    _logger.LogWarning("Redemption code has already been used.");
                    return BadRequest("Redemption code has already been used.");
                }

                if (redemption.ExpirationDate < DateTime.UtcNow)
                {
                    await _redemptionRepository.DeleteRedemptionAsync(redemption.RedemptionId);
                    _logger.LogWarning("Redemption code has already expired.");
                    return BadRequest("Redemption code has already expired.");
                }

            
                var result = await _redemptionRepository.UpdateRedemptionAsync(redemption);
                if(!result) BadRequest();

                return Ok("Coupon redeemed successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while redeeming the redemption.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
