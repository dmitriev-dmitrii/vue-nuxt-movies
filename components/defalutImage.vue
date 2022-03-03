<template   class="w-full h-full  ">
        <div>   
                <loadingSpinner v-show='loading' class="w-full h-full   text-5xl"/>
                <img v-show='!loading & !imgError' @load="onImgLoad" @error="onImgError" :srcset=srcset :src=src :alt=alt  class="w-full h-full object-center  object-cover"/>

                <img v-if="type =='movie'" v-show="imgError" src="@/static/movieNoImg.jpg" class="w-full h-full object-center  object-cover opacity-20" style="content-visibility: auto"/>
                <img v-if="type =='person'" v-show="imgError" src="@/static/personNoImg.png" class="w-full h-full  object-center object-cover opacity-10" style="content-visibility: auto" />

        </div>
</template>

<script>
import loadingSpinner from "@/components/ui/loading-spinner";
export default {
components:{loadingSpinner},
data() {
        return {
        loading: true,
        imgError:false
        };
},      
props: {      
        src: {        
        type: String,   
        required: true,    
        },  
        srcset: {        
        type: String,   
        required: false,    
        },  
        alt: {    
        type: String,       
        required: true,        
        },      
        type: {       
        type: String,  
        required: true,   
        }, 
},
        methods: {
        onImgLoad:function(){this.loading = false;},
        onImgError:function() {
        this.loading = false 
        this.imgError = true;
        },
        },
};
</script>
