export default () =>({
    methods: {
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
    },
})