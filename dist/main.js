const renderer = new Renderer()
const tempManager = new TempManager()

const loadPage = async function () {
    let data = await tempManager.getDataFromDB()
    renderer.renderData(data)
}

const handleSearch = async (cityInput) => {
    await tempManager.getCityData(cityInput)
    renderer.renderData(tempManager.cityData)
}

$('#weatherButton').on('click', function () {
    let cityInput = $('#cityInput').val()
    handleSearch(cityInput)
})

  $('body').on('click', '#add', function() {
    let newCity = $(this)
      .closest('.city')
      .find('div')
      .first()
      .text();
    tempManager.saveCity(newCity);
  });


$("body").on('click', '#remove', function () {
    let cityName = $(this).siblings('#city-name').text()
    let x = tempManager.removeCity(cityName)
    if(x==1){
        $( this ).closest('.city').remove();
    }
    else{
        loadPage()
    }
})

$("#cityInput").keypress(function (e) {
    const key = e.which;
    if (key == 13) {
        $("#weatherButton").trigger("click")
    }
});

loadPage()
