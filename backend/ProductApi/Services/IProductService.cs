using System.Collections.Generic;
using System.Threading.Tasks;
using ProductApi.Dtos;

namespace ProductApi.Services;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllProductsAsync();
    Task<ProductDto?> GetProductByIdAsync(int id);
    Task<ProductDto> AddProductAsync(ProductCreateDto productCreateDto);
}
