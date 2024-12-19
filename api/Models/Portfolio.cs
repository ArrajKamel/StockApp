using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;
[Table("Portfolios")]
public class Portfolio
{
    //this class will be jsut for linking the users with the stocks, the many-to-many relationship
    public string  AppUserId { get; set; } //foreign key for the appUserId 
    public int  StockId { get; set; }
    public AppUser AppUser { get; set; } = null!; //the navigation property, it is just for me as a dev
    public Stock? Stock { get; set; } = null; 
}