import { Box, Container, Typography } from "@mui/material";
import React from "react";

export const TnC = () => {
  // ✅ Common text style
  const textStyle = {
    fontSize: { xs: "16px", md: "18px" },
    lineHeight: { xs: "24px", md: "27px" },
  };

  return (
    <Box sx={{ my: { xs: 2, md: 5 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            p: 2,
            borderRadius: "7px",
            border: "1.5px solid #e8e8e8",
            textAlign: "justify", // ✅ all text inside will be justified
          }}
        >
          <Typography
            className="font-bold"
            sx={{ fontSize: { xs: "26px", md: "30px" } }}
          >
            Terms & Condition
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexDirection: "column", my: 5 }}>
            <Typography className="font-normal" sx={textStyle}>
              By browsing through CSRVoice, you univocally accept and agree to
              comply with and are bound by the following terms and conditions of
              use, which together with our privacy policy govern CSRVoice and
              other affiliate websites.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              The term CSRVoice or 'us' or 'we' refers to the owner of the
              website and our corporate Identity, and the word 'you' refers to
              the user or viewer of the CSRVoice and its affiliate website.
            </Typography>

            <Typography className="font-text-bold" sx={textStyle}>
              The use of this website is subject to the following terms of use:
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              The content of the pages of this website is for your general
              information and use only. It is subject to change without notice.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              Adhering to accuracy and objectivity is our endeavour. Yet,
              neither we nor any third parties provide any warranty or guarantee
              as to the accuracy, timeliness, performance, completeness or
              suitability of the information and materials found or offered on
              this website for any particular purpose. You acknowledge that such
              information and materials may contain inaccuracies or errors, and
              we expressly exclude liability for any such inaccuracies or errors
              to the fullest extent permitted by law.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              Before reproducing any content from the website/websites, you will
              seek written permission for the same from the website owner, and
              reproduction of any such information or materials from this
              website will be entirely at your own risk, for which we shall not
              be liable.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              This website contains material that is owned by or licensed to us.
              This material includes the design, layout, look, appearance, and
              graphics but is not limited to. Reproduction is prohibited other
              than in accordance with the copyright notice, which forms part of
              these terms and conditions.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              All Logos and Trademarks are the property of the respective
              owners.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              Unauthorized use of this website may give rise to a claim for
              damages and/or be a criminal offense.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              This website may also include links to other websites from time to
              time. These links are provided for your convenience to provide
              further information. They do not signify that we endorse the
              website(s). We have no responsibility for the content of the
              linked website(s).
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              You may not create a link to this website from another website or
              document without prior written consent from the CSRVoice.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              Your use of this website and any dispute arising out of such use
              of the website is subject to the laws of India and the choice of
              the CSRVoice in terms of place of legal proceedings/arbitration.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              Before any legal action, you must bring any discrepancy to the
              notice of the Customer Support Group in writing and give adequate
              time to correct it if required. You cannot take any legal action
              unless the grievance is reported and it explicitly causes direct
              or indirect harm to you.
            </Typography>
          </Box>

          <Typography sx={{ color: "#1877f2" }} className="font-normal">
            Published: 10 September 2018
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
