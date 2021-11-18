.<template>
  <div class="location">
    <div class="title">当前定位</div>
    <div class="des">
      <i class="el-icon-position"></i>
      <span>{{ address }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.location {
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
}
.title {
  margin: 10px 0;
  font-size: 12px;
}
.des i {
  color: #009eef;
}
.des span {
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  display: inline-block;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: bottom;
}
</style>