using api.Interfaces;
using api.Mapper;
using api.Models;
using Newtonsoft.Json;

namespace api.Service;

public class FMPService: IFMPService
{
    public static string url { get; set; }
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    public FMPService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }
    public async Task<Stock> FindStockBySymbolAsync(string symbol)
    {
        try
        {
            var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_config["FMPKEY"]}");
            if (result.IsSuccessStatusCode)
            {
                // if we got the data successfully we have to convert it from Json to an object 
                var content = await result.Content.ReadAsStringAsync();
                var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                // we take tasks[0] because we need to add only the first result which match exactly the symbol
                var stock = tasks?[0];
                if (stock != null)
                {
                    return stock.ToStockFromFMP();
                }
                url = $"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey=apikey={_config["FMPKEY"]}";
                return null;
            }
            url = $"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey=apikey={_config["FMPKEY"]}";
            return null; 
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            url = $"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey=apikey={_config["FMPKEY"]}";
            return null; 
        }
    }
}