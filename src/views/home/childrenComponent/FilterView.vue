<template>
  <div
    class="filter_context"
    :class="{ open: isShow || isScreen }"
    @click.self="openClose"
  >
    <!-- 导航 -->
    <div :class="{ fixedview: isShow || isScreen }">
      <div v-if="filterData" class="filter_wrap">
        <div class="filter">
          <div
            class="filter-nav"
            v-for="(item, index) in filterData.navTab"
            :key="index"
            :class="{ filter_bold: currentFilterIndex == index }"
            @click="clickNav(index)"
          >
            <span ref="filter_nav">{{ item.name }}</span>
            <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 排序 -->
    <div class="filter_sort" v-if="filterData.sortBy" v-show="isShow">
      <ul>
        <li
          v-for="(item, index) in filterData.sortBy"
          :key="index"
          @click="selectSort(index, item)"
        >
          <span :class="{ selectName: currentSortIndex == index }">{{
            item.name
          }}</span>
          <i class="fa fa-check" v-show="currentSortIndex == index"></i>
        </li>
      </ul>
    </div>

    <!-- 筛选 -->
    <div class="filter_sort" v-if="filterData.screenBy" v-show="isScreen">
      <div class="filter-screen">
        <div
          v-for="(screen, index) in filterData.screenBy"
          :key="index"
          class="morefilter"
        >
          <p class="title">{{ screen.title }}</p>
          <ul>
            <li
              v-for="(item, i) in screen.data"
              :key="i"
              :class="{ selected: item.select }"
              @click="selectScreen(item, screen)"
            >
              <img v-if="item.icon" :src="item.icon" alt />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="morefilter-btn">
        <span
          class="morefilter-clear"
          @click="clearSelectScreen"
          :class="{ edit: edit }"
          >清空</span
        >
        <span class="morefilter-sure" @click="filterFinish">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentFilterIndex: 0,
      currentSortIndex: 0,
      isShow: false,
      isScreen: false,
    };
  },
  props: {
    filterData: Object,
  },
  computed: {
    edit() {
      let edit = false;
      this.filterData.screenBy.forEach((ele) => {
        ele.data.forEach((item) => {
          if (item.select) {
            edit = true;
          }
        });
      });
      return edit;
    },
  },
  methods: {
    // 点击导航
    clickNav(index) {
      this.$emit("changeState", true);
      this.currentFilterIndex = index;
      switch (index) {
        case 0:
          this.isShow = !this.isShow;
          this.isScreen = false;
          break;
        case 1:
          this.isShow = false;
          this.isScreen = false;
          this.$emit("updataFilter", {
            condition: this.filterData.navTab[1].condition,
          });
          this.$emit("changeState", false);

          break;
        case 2:
          this.isShow = false;
          this.isScreen = false;

          this.$emit("updataFilter", {
            condition: this.filterData.navTab[2].condition,
          });
          this.$emit("changeState", false);

          break;
        case 3:
          this.isScreen = !this.isScreen;
          this.isShow = false;

        default:
          this.isShow = false;
          break;
      }
    },
    // 关闭遮罩层
    openClose() {
      this.$emit("changeState", false);
      this.isShow = false;
      this.isScreen = false;
    },
    // 点击排序
    selectSort(index, item) {
      this.currentSortIndex = index;
      this.$refs.filter_nav[0].innerHTML = item.name;
      this.$emit("updataFilter", { condition: item.code });
      this.isShow = false;
      this.$emit("changeState", false);
    },
    // 点击筛选
    selectScreen(item, screen) {
      if (screen.id !== "MPI") {
        // 判断是否为单选
        screen.data.forEach((ele) => {
          ele.select = false;
        });
      }
      item.select = !item.select;
    },
    // 清空按钮
    clearSelectScreen() {
      this.filterData.screenBy.forEach((ele) => {
        ele.data.forEach((item) => {
          item.select = false;
        });
      });
    },
    // 确认按钮
    filterFinish() {
      let condition = {
        MPI: "",
        offer: "",
        per: "",
      };
      let mpiStr = "";
      this.filterData.screenBy.forEach((screen) => {
        screen.data.forEach((item) => {
          if (item.select) {
            // 两种情况 多选 / 单选
            if (screen.id !== "MPI") {
              // 单选
              condition[screen.id] = item.code;
            } else {
              // 多选
              mpiStr += item.code + ",";
              condition[screen.id] = mpiStr;
            }
          }
        });
      });

      this.$emit("updataFilter", { condition });
      this.isScreen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter_context {
  background: #fff;
  position: -webkit-sticky;
  position: sticky;
  top: 45px;
  z-index: 99;

  .filter {
    position: relative;
    border-bottom: 1px solid #ddd;
    line-height: 10.4vw;
    z-index: 101;
    height: 10.666667vw;
    display: flex;
    justify-content: space-around;
    .filter_bold {
      font-weight: 700;
      color: #333 !important;
    }
    .filter-nav {
      flex: 1;
      text-align: center;
      color: #666;
      font-size: 0.8333rem;
      i {
        width: 1.6vw;
        height: 0.8vw;
        margin-left: 1.333333vw;
        margin-bottom: 0.533333vw;
        fill: #333;
        will-change: transform;
      }
    }
  }

  .filter_sort {
    background-color: #fff;
    color: #333;
    padding-top: 2.133333vw;
    position: absolute;
    width: 100%;
    z-index: 4;
    left: 0;
    top: 21.533333vw;
    .filter-screen {
      background: #fff;
      padding: 0 2.666667vw;
      line-height: normal;
      .morefilter {
        margin: 2.666667vw 0;
        overflow: hidden;
        .title {
          margin-bottom: 2vw;
          color: #666;
          font-size: 0.5rem;
        }
        ul {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          font-size: 0.8rem;
        }
        .selected {
          color: #3190e8 !important;
          background-color: #edf5ff !important;
        }
        li {
          box-sizing: border-box;
          width: 30%;
          height: 9.333333vw;
          line-height: 9.333333vw;
          margin: 0.8vw 1%;
          background: #fafafa;
          img {
            width: 3.466667vw;
            height: 3.466667vw;
            vertical-align: middle;
            margin-right: 0.8vw;
          }
          span {
            margin-left: 2%;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .morefilter-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fafafa;
    box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
    line-height: 11.466667vw;
    box-sizing: border-box;
    span {
      font-size: 0.826667rem;
      text-align: center;
      text-decoration: none;
      flex: 1;
    }
    .morefilter-clear {
      color: #ddd;
      background: #fff;
    }
    .morefilter-sure {
      color: #fff;
      background: #00d762;
      border: 0.133333vw solid #00d762;
    }
    .edit {
      color: #333 !important;
    }
  }
  li {
    position: relative;
    padding-left: 5.333333vw;
    line-height: 10.666667vw;
    overflow: hidden;
    .selectName {
      color: #009eef;
    }
  }
  .fa-check {
    float: right;
    color: #009eef;
    margin-right: 3.733333vw;
    line-height: 10.666667vw;
  }
}

.open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 99;
}

.fixedview {
  position: fixed;
  top: 45px;
  width: 100%;
  background: #fff;
  top: 45px;
}
</style>