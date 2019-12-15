class Renderer {
    renderData(allCityData) {
        let source = $('#container-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template( allCityData );
        $('.city-container').empty().append(newHTML);
    }
}
