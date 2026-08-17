using System.ComponentModel.DataAnnotations;

namespace ProductApi.Dtos;

public class ProductCreateDto
{
    [Required(ErrorMessage = "Ürün adı zorunludur.")]
    [MaxLength(100, ErrorMessage = "Ürün adı en fazla 100 karakter olabilir.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Ürün fiyatı zorunludur.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Ürün fiyatı sıfırdan büyük olmalıdır.")]
    public decimal Price { get; set; }

    public string? Description { get; set; }

    [Required(ErrorMessage = "Ürün stok adedi zorunludur.")]
    [Range(0, int.MaxValue, ErrorMessage = "Stok miktarı negatif olamaz.")]
    public int Stock { get; set; }
}
