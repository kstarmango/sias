export const defaultChartOptions = {
    chart: {
        type: 'pie',
        renderTo: 'chart-container',
        width: null,
        height: 200,
        events: {
            load: function () {
                this.container.style.pointerEvents = 'none';
            }
        },
        backgroundColor: 'transparent',
        spacingTop: 0,
            },
    title: {
        text: null,
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: false,
            },
            animation: false,
            showInLegend: true
        },
    },
    legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        itemStyle: {
            color: '#ffffff',
            fontSize: '10px',
        },
        margin: 10,
        padding : -5
    },
    credits: {
        enabled: false
    },
    series: [],
};