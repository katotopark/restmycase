<template>
  <transition name="fade" type="transition">
    <div v-if="show" id="transition">
      <el-row :gutter="0">
        <el-col :span="20" :offset="2">
          <div class="content">
            <p>LOBALOBAS: <span>{{ lobalobas }}</span></p>
            <p>FFS: <span>{{ ffs }}</span></p>
            <p>TX: <span>{{ tx }}</span></p>
          </div>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>
<script>
import Faker from 'faker'

export default {
	props: {
		show: {
			required: true,
			type: Boolean
		}
	},
	data() {
		return {
			lobalobas: '',
			ffs: '',
			tx: ''
		}
	},
	created() {
		this.lobalobas = Faker.random.number(30)
		this.ffs = Faker.finance.bitcoinAddress()
		this.tx = Faker.finance.bitcoinAddress()
	}
}
</script>
<style scoped>
div.content {
	margin-top: 20%;
	border: 0px solid white;
	height: 50%;
	color: white;
	font-size: 1.1rem;
}
p {
	margin: 20px auto 0px 0%;
	hyphens: auto;
}
p > span {
	font-size: 1rem;
}
div {
	background-color: black;
	height: 100%;
}
.fade-enter-active {
	transition: all 0.8s ease;
}
.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
