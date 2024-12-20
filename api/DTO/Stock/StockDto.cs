using api.DTO.Comment;

namespace api.DTO.Stock
{
    public class StockDto
    {
        public int Id { get; set; }
        public String CompanyName { get; set; } = String.Empty;
        public String Symbol { get; set; } = String.Empty;
        public decimal Purchase { get; set; }
        public decimal LastDiv { get; set; }
        public String Industry { get; set; } = String.Empty;
        public long MarketCap { get; set; }
        public List<CommentDto> Comments { get; set; } = new List<CommentDto>();

    }
}