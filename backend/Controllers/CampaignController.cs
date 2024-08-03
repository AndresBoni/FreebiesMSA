using backend.Dtos.Campaign;
using backend.Interfaces;
using backend.Mapping;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignController : ControllerBase
    {
        private readonly ICampaignRepository _campaignRepository;
        private readonly IUserService _userService;
        private readonly ILogger<CampaignController> _logger;

        public CampaignController(ICampaignRepository campaignRepository, IUserService userService, ILogger<CampaignController> logger)
        {
            _campaignRepository = campaignRepository;
            _userService = userService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var campaigns = await _campaignRepository.GetAllAsync();
                return Ok(campaigns);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving campaigns.");
                return StatusCode(500, "An internal server error occurred.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var campaign = await _campaignRepository.GetByIdAsync(id);
                if (campaign == null)
                {
                    return NotFound("Campaign not found.");
                }

                return Ok(campaign);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving the campaign with id {CampaignId}", id);
                return StatusCode(500, "An internal server error occurred.");
            }
        }

        [HttpPost]
        [Authorize(Policy = "CompanyOnly")]
        public async Task<IActionResult> Create([FromBody] CreateCampaignDto createCampaignDto)
        {
            try
            {
                var user = await _userService.GetAuthenticatedUserAsync(User);

                if (user == null)
                {
                    return Unauthorized("Please authenticate to create a campaign.");
                }

                var campaign = createCampaignDto.ToCampaign(user.Id, user.Name);
                var createdCampaignDto = await _campaignRepository.CreateAsync(campaign);

                return CreatedAtAction(nameof(GetById), new { id = createdCampaignDto.CampaignId }, createdCampaignDto.ToCampaignDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating a campaign.");
                return StatusCode(500, "An internal server error occurred.");
            }
        }
        
        [HttpPut("{id:int}")]
        [Authorize(Policy = "CompanyOnly")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCampaignDto campaignDto)
        {
            try
            {
                var user = await _userService.GetAuthenticatedUserAsync(User);

                if (user == null)
                {
                    return Unauthorized("Please authenticate to update a campaign.");
                }

                var existingCampaign = await _campaignRepository.GetByIdAsync(id);
                if (existingCampaign == null)
                {
                    return NotFound("Campaign not found.");
                }

                if (existingCampaign.UserId != user.Id)
                {
                    return Unauthorized("You are not authorized to update this campaign.");
                }

                var updatedCampaign = await _campaignRepository.UpdateAsync(id, campaignDto, user);
                if (updatedCampaign == null)
                {
                    return BadRequest("Error updating campaign.");
                }

                return Ok(updatedCampaign);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the campaign with id {CampaignId}", id);
                return StatusCode(500, "An internal server error occurred.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "CompanyOnly")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var campaign = await _campaignRepository.GetByIdAsync(id);
                if (campaign == null)
                {
                    return NotFound("Campaign not found.");
                }

                var user = await _userService.GetAuthenticatedUserAsync(User);

                if (user == null)
                {
                    return Unauthorized("Please authenticate to delete a campaign.");
                }

                if (campaign.UserId != user.Id)
                {
                    return Unauthorized("You are not authorized to delete this campaign.");
                }

                var result = await _campaignRepository.DeleteAsync(id);
                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return StatusCode(500, "An error occurred while deleting the campaign.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the campaign with id {CampaignId}", id);
                return StatusCode(500, "An internal server error occurred.");
            }
        }
    }
}
