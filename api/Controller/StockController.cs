using api.DTO.Stock;
using api.Interfaces;
using api.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly IStockRepository _stockRepo;

        public StockController( IStockRepository stockRepo)
        {
            _stockRepo = stockRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var stocks = await _stockRepo.GetAllAsync();
            var stockDto = stocks.Select(s => s.ToStockDto());
            return Ok(stockDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id) 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var stock = await _stockRepo.GetByIdAsync(id);
            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] StockCreateDto stockCreateDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var stockModel =  stockCreateDto.CreateStockDtoToStock();
            await _stockRepo.CreateAsync(stockModel);
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto()); 
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] StockUpdateDto stockUpdateDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var stockModel = await _stockRepo.UpdateAsync(id, stockUpdateDto);
            if (stockModel == null)
            {
                return NotFound();
            }
            return Ok(stockModel.ToStockDto());
        }

        [HttpPut]
        [Route("{id}:int/{CompanyName}:string")]
        public async Task<IActionResult> UpdateCompanyAsync([FromRoute] int id, [FromRoute] StockUpdateDto stockUpdateDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var stockModel = await _stockRepo.UpdateCompanyAsync(id, stockUpdateDto);
            if (stockModel == null)
            {
                return NotFound();
            }
            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]
        [Route("{id}:int")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var stockModel = await _stockRepo.DeleteAsync(id);
            if (stockModel == null)
            {
                return NotFound(); 
            } 
            return NoContent(); 
        }
    }
}