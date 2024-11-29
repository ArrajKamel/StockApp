namespace api.Query;

public class StockQueryObject
{
    public String CompanyName { get; set; } = String.Empty;
    public String Symbol { get; set; } = String.Empty;
    public String? SortBy { get; set; } = null;
    public bool IsDecsending { get; set; } = false;
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}
