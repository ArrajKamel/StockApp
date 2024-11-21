using api.DTO.Comment;
using api.Models;

namespace api.Interfaces;


public interface ICommentRepository
{
    Task<List<Comment>> GetAllAsync();
    Task<Comment?> GetByIdAsync(int id);
    Task<Comment?> UpdateTitleAsync(int id, String title);
    Task<Comment?> UpdateContentAsync(int id, String content);
    Task<Comment> CreateAsync(Comment commentModel);
    Task<Comment?> DeleteAsync(int id);
}