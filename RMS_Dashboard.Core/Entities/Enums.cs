
namespace RMS_Dashboard.Core.Entities;

public enum WorkMode
{
    Onsite,
    Remote,
    Hybrid
}

public enum BenchStatus
{
    Benched,
    Allocated,
    Available
}

public enum TrainingCompletionStatus
{
    NotStarted,
    InProgress,
    Completed
}

public enum ExitStatus
{
    Active,
    Exited
}

public enum BenchCategory
{
    LongTerm,
    ShortTerm,
    NoPlan
}

public enum ProjectStatus
{
    Planned,
    Active,
    Completed,
    OnHold,
    Cancelled
}
