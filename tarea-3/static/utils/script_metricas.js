// para cada gráfico, se utilizo la IA de la página de highcharts:
// https://www.highcharts.com/chat/gpt/

// Gráfico de miembros y días
Highcharts.chart("container-dias", {
  chart: {
    type: "line",
  },
  title: {
    text: "Numero de miembros registrados por día",
  },
  xAxis: {
      type: "datetime",
      title: {
          text: 'Fecha'
      }
  },
  yAxis: {
      title: {
          text: 'Cantidad de Miembros'
      }
  },

  series: [{
      name: 'Miembros Registrados',
      data: []
  }]
});

fetch("http://127.0.0.1:5000/get-stats-data-miembros-dias")
  .then((response) => response.json())
  .then((data) => {
    let parsedData = data.map((item) => {
      const [year, month, day] = item.date
        .split("-")
        .map((part) => parseInt(part, 10));
      return [
        Date.UTC(year, month - 1, day),
        item.count,
      ];
    });

    // Get the chart by ID
    const chart = Highcharts.charts.find(
      (chart) => chart && chart.renderTo.id === "container-dias"
    );

    // Update the chart with new data
    chart.update({
      series: [
        {
          data: parsedData,
        },
      ],
    });
  })
  .catch((error) => console.error("Error:", error));

// Gráfico de torta (keke)
Highcharts.chart('container-keke', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Total de actividades extraprogramáticas por tipo'
    },
    series: [{
        name: 'Actividades',
        colorByPoint: true,
        data: []
    }]
});

fetch("http://127.0.0.1:5000/get-stats-data-keke")
  .then((response) => response.json())
  .then((data) => {
    
    const keke_chart = Highcharts.charts.find(
      (chart) => chart && chart.renderTo.id === "container-keke"
    );

    keke_chart.update({
      series: [
        {
          data: data
        }
      ]
    });
    
  })
  .catch((error) => console.error("Error:", error));

Highcharts.chart('container-comuna', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Total de actividades registradas por comuna'
    },
    xAxis: {
      min: 0,
      title: {
          text: 'Comunas'
      }
    },
    yAxis: {
        title: {
            text: 'Total de actividades'
        }
    },
    series: [{
        name: 'Actividades',
        data: []
    }]
});

fetch("http://127.0.0.1:5000/get-stats-data-comunas")
  .then((response) => response.json())
  .then((data) => {
    const comuna_chart = Highcharts.charts.find(
      (chart) => chart && chart.renderTo.id === "container-comuna"
    );

    comuna_chart.update({
      xAxis: {
        categories: data.map(d => d.name) 
      },
      series: [{
        name: 'Actividades',
        data: data.map(d => d.y)      
      }]
    });
  })
  .catch((error) => console.error("Error:", error));