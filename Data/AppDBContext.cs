using System.Data.Common;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class AppDBContext : DbContext
{
    public AppDBContext(DbContextOptions options):
        base(options)
    {

    }

    public DbSet<Stock> Stocks { get; set; }
    public DbSet<Comment> Comments { get; set; }
}