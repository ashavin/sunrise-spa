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
    const myParam = urlParams.get('email') || 'user1@example.com';
    fetch("https://51.20.92.138:5000/collaborativerecommendations?email="+myParam)
      .then(response => response.json())
      .then(response => {
        // Extracting keys from the collaborative_recommendations object
        const recommendationKeys = Object.keys(response.collaborative_recommendations);

        let skuString = '';
        recommendationKeys.forEach((element, index) => {
          skuString += `"${element}"${index !== recommendationKeys.length - 1 ? ',' : ''}`;
        });
       
        fetch("https://api.europe-west1.gcp.commercetools.com/b2c_deloitte_ai/product-projections/search?filter=variants.sku:"+skuString, requestOptions)
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
