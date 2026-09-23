using BookRecommendationAPI.Data;
using BookRecommendationAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BookRecommendationAPI.Services;

public class SavedBooksServices : ISavedBooksServices
{
    private readonly AppDbContext _context;

    public SavedBooksServices(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SavedBook>> GetAll(string id)
    {
        return await _context.SavedBooks.OrderByDescending(b => b.SavedAt).ToListAsync();
    }

    public async Task<SavedBook?> GetById(string id)
    {
        return await _context.SavedBooks.FindAsync(id);
    }

    public async Task<bool> Delete(string id)
    {
        var book = await _context.SavedBooks.FindAsync(id);
        if (book == null) return false;

        _context.SavedBooks.Remove(book);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<SavedBook?> Update(string id, SavedBook updatedDto)
    {
        var book = await _context.SavedBooks.FindAsync(id);
        if (book == null) return null;

        book.Title = updatedDto.Title;
        book.Author = updatedDto.Author;
        book.Description = updatedDto.Description;

        await _context.SaveChangesAsync();
        return book;
    }
}