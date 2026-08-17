using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductApi.Dtos;
using ProductApi.Services;

namespace ProductApi.Controllers;

[ApiController]
[Route("products")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
    {
        var products = await _productService.GetAllProductsAsync();
        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null)
        {
            return NotFound(new { message = $"ID'si {id} olan ürün bulunamadı." });
        }
        return Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] ProductCreateDto productCreateDto)
    {
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdProduct = await _productService.AddProductAsync(productCreateDto);
        return CreatedAtAction(nameof(GetProduct), new { id = createdProduct.Id }, createdProduct);
    }
}
