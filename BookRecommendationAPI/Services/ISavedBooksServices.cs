using BookRecommendationAPI.Models;

namespace BookRecommendationAPI.Services;

public interface ISavedBooksServices
{
    public Task<List<SavedBook>> GetAll(string Id);
    public Task<SavedBook> GetById(string Id);
    public Task<bool> Delete(string Id);
    Task<SavedBook?> Update(string Id, SavedBook updatedDto);
}