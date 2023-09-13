import { FC, ReactElement, useEffect, useState } from 'react';
import { createBrowserRouter, useNavigation } from '@src/libs/router';
import { AdminLayout } from '@src/views/admin-layout';
import { Dashboard } from '@src/views/dashboard';
import { SystemUsersPage } from '@src/views/system-users-page';
import { BasicCodePage } from '@src/views/basic-code-page';
import { RoutePath } from './route-path';
import { AdminPermission } from '@src/shared/enums';
import { LoginPage } from '@src/views/login';
import { useAuth } from '@src/modules/auth';
import { RedirectPage } from '@src/views/redirect';
import { RptEconomyIntelligencePage } from '@src/views/rpt-economy-intelligence-page';
import { RptIncorruptionIntelligencePage } from '@src/views/rpt-incorruption-intelligence-page';
import { RptLaundryIntelligencePage } from '@src/views/rpt-laundry-intelligence-page';
import { RptUnitsProcStatusPage } from '@src/views/rpt-units-proc-status-page';
import { RptIntelligenceSourcePage } from '@src/views/rpt-intelligence-source-page';
import { CaseManagementPage } from '@src/views/case-management-page';
import { CaseManagementEditPage } from '@src/views/case-management-edit-page';
import { SystemUnitRespPersonPage } from '@src/views/system-unit-resp-person-page';
import { SrcDomesticPage } from '@src/views/src-domestic-page';
import { SrcDomesticEditPage } from '@src/views/src-domestic-edit-page';
import { SrcSecurePage } from '@src/views/src-secure-page';
import { SrcSecureEditPage } from '@src/views/src-secure-edit-page';
import { SrcLaundryPage } from '@src/views/src-laundry-page';
import { SrcLaundryEditPage } from '@src/views/src-laundry-edit-page';

const requirePermission = (element: ReactElement, permission: string) => {
  const RequirePermission: FC = () => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const { isLogged, hasPermission, isExpired } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
      const isPermissionValid = hasPermission(permission);

      if (!isLogged || isExpired()) {
        //  未登入，redirect to LoginPage
        navigation.replace(RoutePath.LOGIN);
      } else if (!isPermissionValid) {
        // 沒權限，redirect to HomePage
        navigation.replace(RoutePath.HOME);
      } else {
        setIsValid(isLogged && isPermissionValid);
      }
    }, [isLogged]);

    return isValid ? element : null;
  };

  return <RequirePermission />;
};

export const AppRouter = createBrowserRouter([
  {
    element: <LoginPage />,
    path: RoutePath.LOGIN,
  },
  {
    element: <RedirectPage />,
    path: RoutePath.REDIRECT,
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: RoutePath.DASHBOARD,
        element: requirePermission(<Dashboard />, AdminPermission.dashboard),
      },
      // {
      //   path: RoutePath.TEST_CASE_LIST,
      //   element: requirePermission(<TestCaseListPage />, AdminPermission.testCaseList),
      // },
      {
        path: RoutePath.RPT_ECONOMY_INTELLIGENCE,
        element: requirePermission(<RptEconomyIntelligencePage />, AdminPermission.rptEconomyIntelligence),
      },
      {
        path: RoutePath.RPT_INCORRUPTION_INTELLIGENCE,
        element: requirePermission(
          <RptIncorruptionIntelligencePage />,
          AdminPermission.rptEconomyIntelligence,
        ),
      },
      {
        path: RoutePath.RPT_LAUNDRY_INTELLIGENCE,
        element: requirePermission(<RptLaundryIntelligencePage />, AdminPermission.rptEconomyIntelligence),
      },
      {
        path: RoutePath.RPT_UNITS_PROC_STATUS,
        element: requirePermission(<RptUnitsProcStatusPage />, AdminPermission.rptEconomyIntelligence),
      },
      {
        path: RoutePath.RPT_INTELLIGENCE_SOURCE,
        element: requirePermission(<RptIntelligenceSourcePage />, AdminPermission.rptEconomyIntelligence),
      },
      {
        path: RoutePath.CASE_MANAGEMENT,
        element: requirePermission(<CaseManagementPage />, AdminPermission.caseManagement),
      },
      {
        path: `${RoutePath.CASE_MANAGEMENT_EDIT}/:seq`,
        element: requirePermission(<CaseManagementEditPage />, AdminPermission.caseManagement),
      },
      {
        path: RoutePath.SYSTEM_USERS,
        element: requirePermission(<SystemUsersPage />, AdminPermission.systemUsers),
      },
      {
        path: RoutePath.BASIC_CODE,
        element: requirePermission(<BasicCodePage />, AdminPermission.basicCode),
      },
      {
        path: RoutePath.SRC_DOMESTIC,
        element: requirePermission(<SrcDomesticPage />, AdminPermission.srcDomestic),
      },
      {
        path: `${RoutePath.SRC_DOMESTIC_EDIT}/:id`,
        element: requirePermission(<SrcDomesticEditPage />, AdminPermission.srcDomestic),
      },
      {
        path: RoutePath.SRC_SECURE,
        element: requirePermission(<SrcSecurePage />, AdminPermission.srcSecure),
      },
      {
        path: `${RoutePath.SRC_SECURE_EDIT}/:id`,
        element: requirePermission(<SrcSecureEditPage />, AdminPermission.srcSecure),
      },
      {
        path: RoutePath.SRC_LAUNDRY,
        element: requirePermission(<SrcLaundryPage />, AdminPermission.srcLaundry),
      },
      {
        path: `${RoutePath.SRC_LAUNDRY_EDIT}/:id`,
        element: requirePermission(<SrcLaundryEditPage />, AdminPermission.srcLaundry),
      },
      {
        path: RoutePath.SYSTEM_UNIT_RESP_PERSON,
        element: <SystemUnitRespPersonPage />,
      },
    ],
  },
]);
