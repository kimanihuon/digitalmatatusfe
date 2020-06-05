class chartData {
    constructor(labels, title, data) {
        this.labels = labels;
        this.title = title;
        this.data = data;
    }

    datasetOne() {
        return {
            type: 'line',
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [
                    { // another line graph
                        label: this.title,
                        data: [100, 100, 80, 70, 80, 50, 50, 120],
                        backgroundColor: [
                            'rgba(183, 71, 71, 0.5)', // Green
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
    datasetTwo() {
        return {
            type: 'line',
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [
                    { // another line graph
                        label: this.title,
                        data: [50, 80, 80, 70, 80, 50, 50, 120],
                        backgroundColor: [
                            'rgba(71, 79, 183, 0.5)', // Green
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