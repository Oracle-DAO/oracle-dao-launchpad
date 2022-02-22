import "./styles.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Headline() {
  return (
    <div class="headline-root">
      <box class="headline-left-box">
        <div class="headline-title">
          Venture Capital
          <br /> Re-Created
          <br />
          for the Masses
        </div>
        <div class="headline-description" margin="10px 0">
          Earn upto 70% APR on staking dao and buy joinin our weekly challenges.
        </div>
        <Button class="headline-button" type="button">
          Stake DAO
        </Button>
      </box>
      <box class="headline-right-box">
        <img
          src="https://shortpixel.com/img/slider/berries-optimized-by-shortpixel.jpg"
          alt="Potato"
          class="headline-img"
        />
      </box>
    </div>
  );
}
