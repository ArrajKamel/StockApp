using api.DTO.Stock;
using api.Interfaces;
using api.Mapper;
using api.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [Route("api/stock")]
    [ApiController]
    public class StockController(IStockRepository stockRepo) : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] StockQueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var stocks = await stockRepo.GetAllAsync(query);
            var stockDto = stocks.Select(s => s.ToStockDto());
            return Ok(stockDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id) 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var stock = await stockRepo.GetByIdAsync(id);
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
            await stockRepo.CreateAsync(stockModel);
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto()); 
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] StockUpdateDto stockUpdateDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var stockModel = await stockRepo.UpdateAsync(id, stockUpdateDto);
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
            
            var stockModel = await stockRepo.UpdateCompanyAsync(id, stockUpdateDto);
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
            
            var stockModel = await stockRepo.DeleteAsync(id);
            if (stockModel == null)
            {
                return NotFound(); 
            } 
            return NoContent(); 
        }
    }
}