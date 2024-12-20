using api.DTO.Comment;
using api.Extensions;
using api.Interfaces;
using api.Repository;
using api.Mapper;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController(ICommentRepository commentRepository, IStockRepository stockRepository, UserManager<AppUser> userManager)
        : ControllerBase
    {
        private readonly ICommentRepository _commentRepository = commentRepository;
        private readonly IStockRepository _stockRepository = stockRepository;
        private readonly UserManager<AppUser> _userManager = userManager;
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var comments = await _commentRepository.GetAllAsync();
            var commentsDto = comments.Select(s =>s.ToCommentDto());
            return Ok(commentsDto);
        }

        [HttpGet("{id}:int")]
        public async Task<IActionResult> GetById(int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var comment = await _commentRepository.GetByIdAsync(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment.ToCommentDto());
        }

        [HttpPost("{stockId}:int")]
        public async Task<IActionResult> Create([FromRoute] int stockId, [FromBody] CommentCreateDto commentDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            if (!await _stockRepository.StockExists(stockId))
            {
                return BadRequest("Stock does not exist");
            }

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            
            var commentModel =  commentDto.CommentCreateDtoToCommentDto(stockId);
            commentModel.AppUserId = appUser.Id;
            
            await _commentRepository.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = commentModel }, commentModel.ToCommentDto()); 
        }

        [HttpPut("{id}:int/title/{title}:string")]
        public async Task<IActionResult> UpdateTitle([FromRoute] int id, [FromRoute] String title)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var comment = await _commentRepository.UpdateTitleAsync(id, title);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment.ToCommentDto());
        }
        
        [HttpPut("{id}:int/content/{content}:string")]
        public async Task<IActionResult> UpdateContent([FromRoute] int id, [FromRoute] String content)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var comment = await _commentRepository.UpdateContentAsync(id, content);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment.ToCommentDto());        
        }
        
        [HttpPut("{id}:int")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CommentUpdateDto commentModel)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var existingComment = await _commentRepository.UpdateAsync(id, commentModel);
            if (existingComment == null)
            {
                return NotFound();
            }
            return Ok(existingComment.ToCommentDto());        
        }
 
        [HttpDelete("{id}:int")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var comment = await _commentRepository.DeleteAsync(id);
            if (comment == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}