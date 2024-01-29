import {
  h,
  render,
  createContext,
} from "https://unpkg.com/preact@latest?module";
import {
  useState,
  useEffect,
  useContext,
} from "https://unpkg.com/preact/hooks/dist/hooks.mjs?module";
import htm from "https://unpkg.com/htm?module";
const html = htm.bind(h);

export { h, render, html, useState, useEffect, createContext, useContext };
