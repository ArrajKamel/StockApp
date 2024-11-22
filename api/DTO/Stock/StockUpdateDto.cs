using System.ComponentModel.DataAnnotations;

namespace api.DTO.Stock
{
    public class StockUpdateDto
    {
        //just in stocks case teh update and create DTOs are the same
        [Required]
        [MaxLength(5, ErrorMessage = "Company name cannot be over 10 over characters.")]
        public String CompanyName { get; set; } = String.Empty;
        [Required]
        [MaxLength(5, ErrorMessage = "Symbol cannot be over 10 over characters.")]
        public String Symbol { get; set; } = String.Empty;
        [Required]
        [Range(1 , 1000000000)]
        public decimal Purchase { get; set; }
        [Required]
        [Range(0.001, 100)]
        public decimal LastDiv { get; set; }
        [Required]
        [MaxLength(10 , ErrorMessage = "Industry cannot be over 10 over characters.")]
        public String Industry { get; set; } = String.Empty;
        [Required]
        [Range(1, 5000000000)]
        public long MarketCap { get; set; }
    }
}