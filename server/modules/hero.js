// 英雄模型
const mongoose = require('mongoose')

const schems = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String },
  // 有的英雄有两种职业分类，使用数组
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // minwen: 使用铭文数据模型
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  // 英雄关系
  partners: [{ // 搭档
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schems)