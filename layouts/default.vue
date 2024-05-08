<template>
  <div>
    <AppHeader />
    <div class="container-fluid">
      <slot />
    </div>
    <AppFooter />

    <BackToTop />
  </div>
</template>

<style>
table {
  border-collapse: collapse;
  margin: 25px auto;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
}

thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

th,
td {
  padding: 12px 15px;
}

tbody tr {
  border-bottom: 1px solid #dddddd;
}

tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

h1 {
  font-size: 4.5em;
  font-weight: 800;
  font-style: normal;
  line-height: 1.24em;
  text-decoration: none;
  margin-top: 1.07em;
  margin-bottom: 0.71em;
}

h2 {
  font-size: 3.75em;
  font-weight: 800;
  font-style: normal;
  line-height: 1.245em;
  text-decoration: none;
  letter-spacing: 0;
  margin-top: 1.32em;
  margin-bottom: 0.9em;
}

h3 {
  font-size: 2.813em;
  font-weight: 800;
  font-style: normal;
  line-height: 1.14em;
  text-decoration: none;
  letter-spacing: 0;
  margin-top: 1.43em;
  margin-bottom: 0.89em;
}

h4 {
  font-size: 2em;
  font-weight: 700;
  font-style: normal;
  line-height: 1.25em;
  text-decoration: none;
  letter-spacing: 0;
  margin-top: 1.97em;
  margin-bottom: 1.33em;
}

h5 {
  font-size: 1.46em;
  font-weight: 700;
  font-style: normal;
  line-height: 1.32em;
  text-decoration: none;
  letter-spacing: 0;
  margin-top: 1.9em;
  margin-bottom: 1.03em;
}

h6 {
  font-size: 1.25em;
  font-weight: 700;
  font-style: normal;
  line-height: 1.45em;
  text-decoration: none;
  letter-spacing: 0;
  margin-top: 2.24em;
  margin-bottom: 0.8em;
}

blockquote {
  background-color: #f0f2f5;
  padding: 50px !important;
  border-left: 10px solid #000;
}

.list-none {
  list-style-type: none;
}

@media (max-width: 1439px) {
  h1 {
    font-size: 3.8em;
    margin-top: 1em;
    margin-bottom: 0.5em;
  }

  h2 {
    font-size: 3.3em;
    margin-top: 1.1em;
    margin-bottom: 0.6em;
  }

  h3 {
    font-size: 2.5em;
    margin-top: 1.3em;
    margin-bottom: 0.8em;
  }

  h4 {
    font-size: 1.9em;
    margin-top: 1.7em;
    margin-bottom: 0.9em;
  }

  h5 {
    font-size: 1.4em;
    margin-top: 1.8em;
    margin-bottom: 0.9em;
  }

  h6 {
    font-size: 1.25em;
    margin-top: 2em;
    margin-bottom: 0.8em;
  }
}
@media (max-width: 1279px) {
  h1 {
    font-size: 36px;
    line-height: 42px;
    margin-top: 36px;
    margin-bottom: 20px;
    letter-spacing: 0;
  }

  h2 {
    font-size: 32px;
    line-height: 38px;
    margin-top: 42px;
    margin-bottom: 24px;
    letter-spacing: 0;
  }

  h3 {
    font-size: 24px;
    line-height: 28px;
    margin-top: 40px;
    margin-bottom: 22px;
    letter-spacing: 0;
  }

  h4 {
    font-size: 22px;
    line-height: 28px;
    margin-top: 32px;
    margin-bottom: 18px;
    letter-spacing: 0;
  }

  h5 {
    font-size: 20px;
    line-height: 24px;
    margin-top: 30px;
    margin-bottom: 16px;
    letter-spacing: 0;
  }

  h6 {
    font-size: 17px;
    line-height: 20px;
    margin-top: 28px;
    margin-bottom: 12px;
    letter-spacing: 0;
  }
}
@media (max-width: 1023px) {
  h1 {
    font-size: 34px;
    line-height: 42px;
    margin-top: 30px;
    margin-bottom: 16px;
  }

  h2 {
    font-size: 30px;
    line-height: 36px;
    margin-top: 38px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 28px;
    line-height: 32px;
    margin-top: 36px;
    margin-bottom: 18px;
  }

  h4 {
    font-size: 22px;
    line-height: 27px;
    margin-top: 30px;
    margin-bottom: 16px;
  }

  h5 {
    font-size: 20px;
    line-height: 24px;
    margin-top: 28px;
    margin-bottom: 14px;
  }

  h6 {
    font-size: 17px;
    line-height: 22px;
    margin-top: 24px;
    margin-bottom: 10px;
  }
}
@media (max-width: 767px) {
  h1 {
    font-size: 28px;
    line-height: 32px;
    margin-top: 32px;
    margin-bottom: 18px;
  }

  h2 {
    font-size: 26px;
    line-height: 30px;
    margin-top: 30px;
    margin-bottom: 18px;
  }

  h3 {
    font-size: 22px;
    line-height: 26px;
    margin-top: 28px;
    margin-bottom: 18px;
  }

  h4 {
    font-size: 18px;
    line-height: 22px;
    margin-top: 26px;
    margin-bottom: 16px;
  }

  h5 {
    font-size: 17px;
    line-height: 20px;
    margin-top: 24px;
    margin-bottom: 14px;
  }

  h6 {
    font-size: 16px;
    line-height: 19px;
    margin-top: 22px;
    margin-bottom: 10px;
  }
}
</style>
