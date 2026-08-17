using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductApi.Dtos;
using ProductApi.Models;
using ProductApi.Repositories;

namespace ProductApi.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        var products = await _repository.GetAllAsync();
        return products.Select(p => MapToDto(p));
    }

    public async Task<ProductDto?> GetProductByIdAsync(int id)
    {
        var product = await _repository.GetByIdAsync(id);
        return product == null ? null : MapToDto(product);
    }

    public async Task<ProductDto> AddProductAsync(ProductCreateDto productCreateDto)
    {
        var product = new Product
        {
            Name = productCreateDto.Name,
            Price = productCreateDto.Price,
            Description = productCreateDto.Description,
            Stock = productCreateDto.Stock,
            CreatedDate = DateTime.UtcNow
        };

        await _repository.AddAsync(product);
        await _repository.SaveChangesAsync();

        return MapToDto(product);
    }

    private static ProductDto MapToDto(Product product)
    {
        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Price = product.Price,
            Description = product.Description,
            Stock = product.Stock,
            CreatedDate = product.CreatedDate
        };
    }
}
