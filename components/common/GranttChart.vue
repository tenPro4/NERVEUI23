<template>
    <div class="d-flex justify-content-center flex-column">
      <div class="d-flex justify-content-end my-3">
        <select @change="typeFilter" v-model="typeSelected" class="mx-2">
            <option value="c">Category</option>
            <option value="p">Product</option>
        </select>
        <select @change="timeLineFilter" v-model="timeLineSelected">
            <option v-for="op in filterOptions" :value="op.value" :key="op.value">{{ op.label }}</option>
        </select>
      </div>
      <!-- <div v-if="items.length > 0" ref="timeline" :style="{'height':`${pxCalculate*75}px`}" class="row mx-1 my-1"></div> -->
      <div v-if="items.length > 0" ref="timeline" :style="{'height':`${pxCalculate*100}px`}" class="my-1"></div>
        <p v-else>No Record</p>
    </div>
  </template>
  
  <script>
    import * as am4core from "@amcharts/amcharts4/core"
    import * as am4charts from "@amcharts/amcharts4/charts"
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
  export default{
    props:{
        items: {
            type: Array,
            required: true
        },
    },
    watch: {
        '$store.state.layout.mode'() {
            if(this.$store.state.layout.mode === 'dark'){
                this.categoryRef.renderer.labels.template.fill = am4core.color("#ffffff")
                this.dateAxisRef.renderer.labels.template.fill = am4core.color("#ffffff")
            }
            else{
                this.categoryRef.renderer.labels.template.fill = am4core.color("#000000")
                this.dateAxisRef.renderer.labels.template.fill = am4core.color("#000000")
            }
        }
    },
    data(){
        return{
            chartInstance:null,
            chartData:[],
            typeSelected:'c',
            timeLineSelected:'t',
            dateAxisRef:null,
            categoryRef:null,
            filterSelect:null,
            filterOptions:[
                {
                    label:"Today",
                    value:"t"
                },
                {
                    label:"Montly",
                    value:"m"
                },
                {
                    label:"Yearly",
                    value:"y"
                }
            ]
        }
    },
    mounted() {
        this.initChart();
    },
    computed:{
        pxCalculate(){
            const filterData = this.filterDataByDateTime(this.items);
            let count = 0;
            if(this.typeSelected === 'c'){
                count = [...new Set(filterData.map(item => item.categoryName))].length;
            }
            else{
                count = [...new Set(filterData.map(item => item.productName))].length;
            }

            return count === 1 || count === 0 ? 2 : count;
        }
    },
    methods: {
        initChart(){
             this.chartData =[]
           
            this.chartData = this.items.map(x =>({
                ...x,
                duration: this.durationBetweenTime(x.startAt,x.endAt)
            }));
            this.timelineChartGenerate(this.chartData)
        },
        durationBetweenTime(start,end){
            const minutes = this.$dayjs(end).diff(this.$dayjs(start),'minute',true)
            return parseInt(minutes);
        },
        timeLineFilter(e){
            if(e.target.value){
                const filterSelect = e.target.value;
                let newData = [];
                if(filterSelect === 't'){
                    newData = this.chartData.filter((item) => this.checkDay(item.startAt) && this.checkDay(item.endAt))
                }
                else if(filterSelect === 'm'){
                    newData = this.chartData.filter((item) => this.checkMonth(item.startAt) && this.checkMonth(item.endAt))
                }
                else{
                    newData = this.chartData.filter((item) => this.checkYear(item.startAt) && this.checkYear(item.endAt))
                }

                this.timelineChartGenerate(newData)
            }
        },
        checkDay(item){
                if(this.$dayjs(item).$D === this.$dayjs().$D && 
                this.$dayjs(item).$M === this.$dayjs().$M &&
                this.$dayjs(item).$y === this.$dayjs().$y){
                    return true
                }
        },
        checkMonth(item){
            if(this.$dayjs(item).$M === this.$dayjs().$M &&
                this.$dayjs(item).$y === this.$dayjs().$y){
                    return true
                }
        },
        checkYear(item){
            if(this.$dayjs(item).$y === this.$dayjs().$y){
                    return true
                }
        },
        typeFilter(e){
            this.timelineChartGenerate(this.chartData)
        },
        timelineChartGenerate(data){
            if(this.chartInstance != null){
                this.chartInstance.dispose()
            }
            am4core.options.autoDispose = true;
            const chart = am4core.create(this.$refs.timeline, am4charts.XYChart)
            // Disable amChart Logo
            if (chart.logo) {
                chart.logo.disabled = true
            }

            chart.dateFormatter.inputDateFormat = "yyyy-MM-ddTHH:mm:ss"
            chart.dateFormatter.dateFormat = "yyyy-MM-ddTHH:mm:ss"

            const colorSet = new am4core.ColorSet();
            colorSet.saturation = 0.4;

            const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
            categoryAxis.dataFields.category = this.typeSelected === 'c' ? "categoryName" : "productName"
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.inversed = true;
            // categoryAxis.renderer.labels.template.disabled = true


            const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
            chart.dateFormatter.dateFormat = "yyyy-MM-ddTHH:mm:ss";
            dateAxis.renderer.minGridDistance = 70;
            dateAxis.baseInterval = { count: 1, timeUnit: "second" };

            dateAxis.renderer.tooltipLocation = 0;
            this.categoryRef = categoryAxis;
            this.dateAxisRef = dateAxis;

            if(this.$store.state.layout.mode === 'dark'){
                this.categoryRef.renderer.labels.template.fill = am4core.color("#ffffff")
                this.dateAxisRef.renderer.labels.template.fill = am4core.color("#ffffff")
            }
            else{
                this.categoryRef.renderer.labels.template.fill = am4core.color("#000000")
                this.dateAxisRef.renderer.labels.template.fill = am4core.color("#000000")
            }

            const series1 = chart.series.push(new am4charts.ColumnSeries())
            series1.columns.template.width = am4core.percent(80);

            const categoryToolTip = "Start: {startAt.formatDate('d/M/yyyy hh:mm:ss a')}\nEnd: {endAt.formatDate('d/M/yyyy hh:mm:ss a')}\nDuration: {duration} minutes"
            const productToolTip = "Start: {startAt.formatDate('d/M/yyyy hh:mm:ss a')}\nEnd: {endAt.formatDate('d/M/yyyy hh:mm:ss a')}\nPIC: {pic}\nDuration: {duration} minutes"
            series1.columns.template.tooltipText = this.typeSelected === 'c' ? categoryToolTip : productToolTip;

            series1.dataFields.openDateX = "startAt"
            series1.dataFields.dateX = "endAt"
            series1.dataFields.categoryY = this.typeSelected === 'c' ? "categoryName" : "productName"
            series1.dataFields.user = "pic"
            series1.dataFields.duration = "duration"

            series1.columns.template.strokeOpacity = 1;

            chart.scrollbarX = new am4core.Scrollbar()
            chart.scrollbarX.minHeight = 50
            chart.data = this.filterDataByDateTime(data);
  
            this.chartInstance = chart;
            return chart
        },
        filterDataByDateTime(data){
            let dataFilterByTimeLine = [];
            if(this.timeLineSelected === 't'){
                dataFilterByTimeLine = data.filter((item) => this.checkDay(item.startAt) && this.checkDay(item.endAt))
            }
            else if(this.timeLineSelected === 'm'){
                dataFilterByTimeLine = data.filter((item) => this.checkMonth(item.startAt) && this.checkMonth(item.endAt))
            }
            else{
                dataFilterByTimeLine = data.filter((item) => this.checkYear(item.startAt) && this.checkYear(item.endAt))
            }
            return dataFilterByTimeLine;
        }
    },
  }
</script>