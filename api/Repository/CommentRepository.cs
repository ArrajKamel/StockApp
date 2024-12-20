using api.Data;
using api.DTO.Comment;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository;

public class CommentRepository : ICommentRepository
{
    private readonly AppDBContext _context;
    public CommentRepository(AppDBContext context)
    {
        _context = context;
    }
    public async Task<List<Comment>> GetAllAsync()
    {
        return await _context.Comments.Include(a => a.AppUser).ToListAsync();
    }
    public async Task<Comment?> GetByIdAsync(int id)
    {
        return await _context.Comments.Include(a => a.AppUser).FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Comment?> UpdateTitleAsync(int id, string title)
    {
        var existingComment = await _context.Comments.FindAsync(id);
        if (existingComment == null)
        {
            return null;
        }
        existingComment.Title = title;
        await _context.SaveChangesAsync();
        return existingComment; 
    }

    public async Task<Comment?> UpdateContentAsync(int id, string content)
    {
        var existingComment = await _context.Comments.FindAsync(id);
        if (existingComment == null)
        {
            return null;
        }
        existingComment.Content = content;
        await _context.SaveChangesAsync();
        return existingComment; 
    }

    public async Task<Comment?> UpdateAsync(int id, CommentUpdateDto commentModel)
    {
        var existingComment = await _context.Comments.FindAsync(id);
        if (existingComment == null)
        {
            return null;
        }
        existingComment.Content = commentModel.Content;
        existingComment.Title = commentModel.Title;
        await _context.SaveChangesAsync();
        return existingComment; 
    }

    public async Task<Comment> CreateAsync(Comment commentModel)
    {
        await _context.Comments.AddAsync(commentModel);
        await _context.SaveChangesAsync(); 
        return commentModel;
    }

    public async Task<Comment?> DeleteAsync(int id)
    {
        var commentToDelete = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
        if (commentToDelete == null)
        {
            return null; 
        }
        _context.Comments.Remove(commentToDelete);
        await _context.SaveChangesAsync();
        return commentToDelete; 
    }

    // public async Task<Comment?> UpdateAsync(int id, UpdateCommentDto comment)
    // {
    //     var commentToUpdate = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
    //     if (commentToUpdate == null)
    //     {
    //         return null;
    //     }
    //     commentToUpdate.Content = comment.Content;
    //     commentToUpdate.Title = comment.Title;
    //     await _context.SaveChangesAsync();
    //     return commentToUpdate;
    // }
    //
    // public async Task<Comment> CreateAsync(Comment commentModel)
    // {
    //     await _context.Comments.AddAsync(commentModel);
    //     await _context.SaveChangesAsync();
    //     return commentModel;
    // }
    //
    // public async Task<Comment?> DeleteAsync(int id)
    // {
    //     var commentToDelete = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
    //     if (commentToDelete == null)
    //     {
    //         return null; 
    //     }
    //     _context.Comments.Remove(commentToDelete);
    //     await _context.SaveChangesAsync();
    //     return commentToDelete; 
    // }
}