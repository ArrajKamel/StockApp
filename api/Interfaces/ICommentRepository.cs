using api.DTO.Comment;
using api.Models;
using api.Query;

namespace api.Interfaces;


public interface ICommentRepository
{
    Task<List<Comment>> GetAllAsync(CommentQueryObject query);
    Task<Comment?> GetByIdAsync(int id);
    Task<Comment?> UpdateTitleAsync(int id, String title);
    Task<Comment?> UpdateContentAsync(int id, String content);
    Task<Comment?> UpdateAsync(int id, CommentUpdateDto commentModel);
    Task<Comment> CreateAsync(Comment commentModel);
    Task<Comment?> DeleteAsync(int id);
}