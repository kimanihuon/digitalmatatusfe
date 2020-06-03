class chartData {
    constructor(labels, title, data) {
        this.labels = labels;
        this.title = title;
        this.data = data;
    }

    chartData() {
        return {
            type: 'line',
            data: {
                labels: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
                datasets: [
                    { // another line graph
                        label: this.title,
                        data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
                        backgroundColor: [
                            'rgba(71, 183,132,.5)', // Green
                        ],
                        borderColor: [
                            '#47b784',
                        ],
                        borderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                lineTension: 1,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            padding: 25,
                        }
                    }]
                }
            }
        }

    }
}



export default chartData

// export { data }