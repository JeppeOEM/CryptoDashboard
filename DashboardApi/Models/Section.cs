namespace DashboardApi.Models;

public partial class Section
{
    public long Id { get; set; }
    public string? GridConfig { get; set; }

    public Section()
    {
        GridConfig ??= "";

    }

}

