class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let data = await $.get(`/cities`)
            this.cityData = data
            return data
    }

    async getCityData(cityName) {
        let data = await $.get(`/city/${cityName}`)
        this.cityData.push({
            name: data.name,
            temperature: data.main.temp,
            condition: data.weather[0].main,
            conditionPic: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            saved: false
    })
    console.log(this.cityData)
    } 

    async saveCity(cityName){
        for(let c of this.cityData){
            if(c.name == cityName && c.saved == false){
              await  $.post('/city', c, function(err){
                c['saved']=true
                console.log(c.name + ' was saved to the DB')
              })
            } 
        }
    }

    async removeCity(cityName) {
        const unsavedCity = await $.ajax({
            url: `/city/${cityName}`,
            method: "delete",
            success: function (res) {
                return res
            }
        })
        this.cityData.find(c => c.name == cityName)
        this.cityData.push(unsavedCity)
    }
}
