class Fares {
    constructor() {
    }

    fetch(instance, origin_id, period) {

        instance.$store.commit("fetchingFares");

        instance.$http
            .get(
                `${instance.$url}/api/fares?origin_id=${origin_id}&period=${period}`
            )
            .then(function (response) {
                if (response.data.success) {
                    instance.$store.commit("updateFares", {
                        fares: response.data.info.fares,
                        period: period,
                        origin_id: origin_id
                    })
                    // console.log(instance.$store.state.gtfs.fares)
                } else {
                    console.log(response.data.message)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

}

export default Fares
