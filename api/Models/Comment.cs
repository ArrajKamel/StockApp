using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;
[Table("comments")]
public class Comment
{
    public int? StockId { get; set; }
    public Stock? Stock { get; set; }
    public int Id { get; set; }
    public String Title { get; set; } = String.Empty;
    public String Content { get; set; } = String.Empty;
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;//UtcNow because i am using postgres DBMS
    public string AppUserId { get; set; } = String.Empty;
    public AppUser AppUser { get; set; }
}