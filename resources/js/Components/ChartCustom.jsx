import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';

const ChartConfig = {
    views: {
        label: 'Total Transaksi',
    },
    loan: {
        label: 'Peminjaman',
        color: 'hsl(var(--chart-3))',
    },
    return_book: {
        label: 'Pengembalian',
        color: 'hsl(var(--chart-4))',
    },
};

export default function ChartCustom({ chartData }) {
    const [activeChart, setActiveChart] = useState('loan');

    const total = useMemo(
        () => ({
            loan: chartData.reduce((acc, cur) => acc + cur.loan, 0),
            return_book: chartData.reduce((acc, cur) => acc + cur.return_book, 0),
        }),
        [chartData],
    );

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5">
                    <CardTitle>Grafik Transaksi</CardTitle>
                    <CardDescription>Menampilkan grafik transaksi 1 bulan terakhir</CardDescription>
                </div>
                <div className="flex">
                    {['loan', 'return_book'].map((key) => (
                        <button
                            key={key}
                            data-active={activeChart === key}
                            className="even:border-1 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-t sm:px-8 sm:py-6"
                            onClick={() => setActiveChart(key)}
                        >
                            <span className="text-xs text-muted-foreground">{ChartConfig[key].label}</span>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                                {total[key].toLocaleString()}
                            </span>
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer config={ChartConfig} className="aspect-auto h-[250px] w-full">
                    <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={8}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
