<template>
  <div class="search_shop">
    <Header title="搜索" />
    <div class="search_header">
      <form class="search_wrap">
        <i class="fa fa-search"></i>
        <input
          type="text"
          placeholder="搜索商家 商品名称"
          v-model="key_words"
        />
        <button>搜索</button>
      </form>
    </div>
    <scroll class="scroll" v-if="isShow">
      <div class="empty_wrap" v-if="empty">
        <img
          src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png"
          alt
        />
        <div class="empty_txt">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
      <div v-else>
        <search-shop-list
          v-if="searchShopList"
          :data="searchShopList.restaurants"
          @click="clickShopList"
        ></search-shop-list>
        <search-shop-list
          v-if="searchShopList"
          :data="searchShopList.words"
          @click="clickShopList"
        ></search-shop-list>
      </div>
    </scroll>

    <scroll v-else>
      <div>商家信息</div>
    </scroll>
  </div>
</template>

<script>
import Header from "@/components/content/header/Header.vue";
import SearchShopList from "./childrenComponents/SearchShopList.vue";
import Scroll from "@/components/common/scroll/Scroll";
import { _getSearchShop } from "@/network/searchShop.js";
import { debounce } from "../../common/utils.js";
export default {
  name: "SearchShop",
  data() {
    return {
      key_words: "",
      searchShopList: null,
      empty: true,
      isShow: true,
    };
  },
  created() {
    this.keyWordsDebounce = debounce(() => {
      this.getShopInfo();
    });
  },
  watch: {
    key_words() {
      if (!this.key_words) {
        this.empty = true;
        return (this.searchShopList = null);
      }
      this.keyWordsDebounce();
    },
  },
  components: {
    Header,
    Scroll,
    SearchShopList,
  },
  methods: {
    getShopInfo() {
      if (this.key_words !== "") {
        _getSearchShop(this.key_words).then((res) => {
          console.log(this.key_words);
          console.log(res);
          this.searchShopList = res.data;
          if (
            res.data &&
            (res.data.restaurants.length > 0 || res.data.words.length > 0)
          ) {
            this.empty = false;
          } else {
            this.empty = true;
          }
        });
      }
    },
    clickShopList() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.search_shop {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  .search_header {
    background: #fff;
    padding: 0 4.266667vw;

    .search_wrap {
      padding: 2.933333vw 2.933333vw 2.933333vw 0;
      display: flex;
      align-items: center;
      position: relative;

      .fa-search {
        width: 2.933333vw;
        height: 2.933333vw;
        color: #888;
        position: absolute;
        top: 4.6666666vw;
        left: 2.933333vw;
      }

      input {
        flex-grow: 1;
        border-radius: 0.266667vw;
        background-color: #f8f8f8;
        padding: 1.733333vw 4vw 1.733333vw 8.8vw;
        color: #666;
        outline: none;
        border: none;
      }

      button {
        outline: none;
        border: none;
        color: #333;
        font-size: 0.426667rem;
        background: #fff;
        font-weight: 700;
        margin-left: 2.933333vw;
        font-size: 14px;
      }
    }
  }

  .scroll {
    height: calc(100vh - 49px - 45px - 56.63px);
    overflow: hidden;

    .empty_wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #fff;
      display: flex;
      justify-content: center;

      img {
        width: 35vw;
        height: 35vw;
      }

      .empty_txt {
        h4 {
          color: #666;
          font-size: 1rem;
          margin: 12vw 0 2vw 0;
        }
        span {
          color: #999;
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>