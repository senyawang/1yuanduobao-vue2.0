<template>
  <div class="hello">
    头条数据：<br>
    http://jyapi.1yuantaohuo.com/product/lamp_list.html?accessToken=3b2a3019-d726-4529-b4c5-8951a8c1ab1b&asign=e6d3cbdb629b6760623e50c4468f4de6&channel=appstore&clientId=JYDB1001&environment=debug&idfa=54F60A8B-95D6-416C-9938-A3C0AF5C2970&os=IOS&t=1480424156&version=1.6
    <br>
    头条公告下面：两分钟获取一次新数据<br>
      http://jyapi.1yuantaohuo.com/product/finish_period_list.html?accessToken=3b2a3019-d726-4529-b4c5-8951a8c1ab1b&asign=9770bc4d0cd6b038449a5a329d3d19af&channel=appstore&clientId=JYDB1001&environment=debug&idfa=54F60A8B-95D6-416C-9938-A3C0AF5C2970&limit=4&os=IOS&t=1480423365&version=1.6
      <br>
    商品列表：<br>
      http://jyapi.1yuantaohuo.com/product/period_list.html?accessToken=3b2a3019-d726-4529-b4c5-8951a8c1ab1b&asign=585f241d079047f7fb383f7f19cf42c1&channel=appstore&clientId=JYDB1001&environment=debug&idfa=54F60A8B-95D6-416C-9938-A3C0AF5C2970&os=IOS&t=1480424044&tabId=1007&version=1.6
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
