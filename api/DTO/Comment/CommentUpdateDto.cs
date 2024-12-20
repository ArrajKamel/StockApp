using System.ComponentModel.DataAnnotations;

namespace api.DTO.Comment;

public class CommentUpdateDto
{
    [Required]
    [MinLength(5, ErrorMessage = "Title must be at least 5 characters long")]
    [MaxLength(150, ErrorMessage = "Title must be between 5 and 150 characters")]
    public String Title { get; set; } = string.Empty;
    [Required]
    [MinLength(5, ErrorMessage = "Content must be at least 5 characters long")]
    [MaxLength(1500, ErrorMessage = "Content must be between 5 and 1500 characters")]
    public String Content { get; set; } = string.Empty;
}