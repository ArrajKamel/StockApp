using api.Models;
using api.DTO.Comment;
using api.DTO.Stock;

namespace api.Mapper
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment comment)
        {
            return new CommentDto()
            {
                Id = comment.Id,
                Content = comment.Content,
                CreatedOn = comment.CreatedOn,
                StockId = comment.StockId,
                Title = comment.Title
            };
        }

        public static Comment CommentCreateDtoToCommentDto(this CommentCreateDto commentDto, int stockId)
        {
            return new Comment()
            {
                StockId = stockId,
                Content = commentDto.Content,
                Title = commentDto.Title
            };
        }
    }
}