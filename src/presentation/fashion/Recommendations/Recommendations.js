import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';
import { useI18n } from 'vue-i18n';
import fetch from 'isomorphic-fetch';

export default {
  
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local',
    });
    return {
      t, 
    };
  },
  components: {
    VueperSlides,
    VueperSlide,
  },
  data: () => ({
    autoPlaying: true,
    internalAutoPlaying: true,
    slides: []
  }),
  async mounted () {

    var myHeaders = new Headers();
    const token = localStorage.getItem('ACCESS_TOKEN');

    myHeaders.append("Authorization", "Bearer " + token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('email');

    fetch("https://16.16.187.7:5000/contentrecommendations?email="+myParam)
      .then(response => response.json())
      .then(response => {
        let str = '';
        response.content_recommendations.forEach((element, index) => {
          str = str + `"${element}"${index !== response.content_recommendations.length - 1 ? ',' : ''}`;
        });
       
        fetch("https://api.europe-west1.gcp.commercetools.com/sunrise-spa/product-projections/search?filter=variants.sku:"+str, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.slides = result?.results;
          console.log(this.slides);
        })
      }).catch((err) => {
        console.log(err);
      })
    
  },
};
