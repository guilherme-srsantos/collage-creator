export interface topTracksFilter{
    user: string,
    period: Period,
    limit: number | undefined,
    page: number | 50,
}

export enum Period{
    Overall = "overall",
    OneWeek = "1week",
    OneMonth = "1month",
    ThreeMonths = "3month",
    SixMonths = "6month",
    TwelveMonths = "12month"
}