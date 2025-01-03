namespace api.DTO.Comment;

public class CommentDto
{
    public int Id { get; set; }
    public String Title { get; set; } = string.Empty;
    public String Content { get; set; } = string.Empty;
    public DateTime CreatedOn { get; set; } = DateTime.Now;
    public string CreatedBy { get; set; } = string.Empty;
    public int? StockId { get; set; }
}