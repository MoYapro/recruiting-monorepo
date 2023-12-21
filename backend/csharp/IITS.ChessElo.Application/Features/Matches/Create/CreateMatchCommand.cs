namespace IITS.ChessElo.Application.Features.Matches.Create;

public record CreateMatchCommand(
    string WhitePlayerUserName,
    string BlackPlayerUserName,
    Outcome Outcome,
    DateTimeOffset? Timestamp) : IRequest<Guid>;