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
                    console.log(c.name + ' was saved to the DB')
              })
            } 
        }
        console.log(cityName + ' is already saved')
    }

    removeCity(cityName){
        for(let c in this.cityData){
            if(this.cityData[c].name==cityName){
            if(this.cityData[c].saved){
                this.cityData.splice(c,1)
            }
            else{
                this.cityData.splice(c,1)
                return 1;
            }
        }
    }
        $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            success: (result) => {}
        });
    }
}
